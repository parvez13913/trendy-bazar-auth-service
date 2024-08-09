import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAdmin, IAdminFilters } from "./admin.interface";
import { Admin } from "./admin.model";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { adminSearchableFields } from "./admin.constants";

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const result = await Admin.create(payload);

  return result;
};

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






export const AdminService = {
  createAdmin,
  getAllAdmins,
}