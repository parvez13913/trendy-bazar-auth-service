import mongoose, { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAdmin, IAdminFilters } from "./admin.interface";
import { Admin } from "./admin.model";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { adminSearchableFields } from "./admin.constants";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.model";


const getAllAdmins = async (filters: IAdminFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAdmin[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  };

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  };

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  };

  const wereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Admin.find(wereConditions);

  const total = await Admin.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);

  return result;
};


const updateAdmin = async (id: string, payload: Partial<IAdmin>): Promise<IAdmin | null> => {
  const isExistAdmin = await Admin.findById(id);

  if (!isExistAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found');
  };

  const result = await Admin.findOneAndUpdate({ _id: id }, payload, { new: true });

  return result;
};

const deleteAdmin = async (id: string) => {
  const isUserExist = await Admin.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  };

  let newAdminData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    newAdminData = await Admin.deleteOne({ _id: id }, { session });

    await User.deleteOne({ email: isUserExist?.email }, { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  };
  return newAdminData

};






export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}