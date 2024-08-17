import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import bcrypt from 'bcrypt';
import { User } from "../user/user.model";
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import { JwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { ENUM_USER_ROLE } from "../../../enum/user";
import { Admin } from "../admin/admin.model";
import { Customer } from "../customer/customer.model";
import { Seller } from "../seller/seller.model";
import { sendEMail } from "./auth.sendMail";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  };

  // Match password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  };

  // access token && refresh token
  const { email: userEmail, role } = isUserExist;
  const accessToken = JwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.createToken(
    { userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userEmail } = verifiedToken;

  // checking deleted user's refresh token
  const isUserExist = await User.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const newAccessToken = JwtHelpers.createToken(
    { email: isUserExist?.email, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};


const forgotPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload?.email }, { email: 1, role: 1 });


  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  };

  let profile = null;

  if (user?.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ email: user?.email });
  } else if (user?.role === ENUM_USER_ROLE.CUSTOMER) {
    profile = await Customer.findOne({ email: user?.email });
  } else if (user?.role === ENUM_USER_ROLE.SELLER) {
    profile = await Seller.findOne({ email: user?.email });
  };

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile  not found!');
  };

  if (!profile?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email  not found!');
  };

  const passwordResetToken = await JwtHelpers.createPasswordResetToken({ id: user?.id }, config.jwt.secret as string, '5m');

  const resetLink: string = config.resetLink + `token=${passwordResetToken}`;

  await sendEMail(profile?.email, `
    <div>
       <p>Hi, ${profile?.name?.firstName}</p>
       <p>your password reset link: <a href=${resetLink}>Click Here</a></p>
       <p>Thank you</p>
    </div>`);

};


const resetPassword = async (payload: { email: string, newPassword: string }, token: string) => {
  const { email, newPassword } = payload;
  const user = await User.findOne({ email: email }, { email: 1 });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found!!");
  };

  const isVerified = await JwtHelpers.verifiedToken(token, config.jwt.secret as Secret,);

  if (!isVerified) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are noot authorized");
  };

  const password = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

  await User.updateOne({ email }, { password });
};



export const AuthService = {
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
};