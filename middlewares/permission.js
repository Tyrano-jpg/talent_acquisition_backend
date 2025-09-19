import verifyToken from './verifyToken.js';
import { SomethingWrong, UserNotFound } from '../utils/response/response.js';
import { ExtractRequiredPermission } from '../utils/permissionRequirement/requirement.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FetchUserByUserName } from '../utils/fetchDetails/fetchDetailsByUserName.js';
import UserModel from '../database/schema/user.schema.js';
import ApiError from '../utils/errors/ApiError.js';

// Get the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// export default CheckRoleAndTokenAccess;

const RolesPermissions = (name, key) => {
  return async (req, res, next) => {
    try {
      let user = req?.userDetails;
      // const user = await UserModel.findById(userId).populate("role_id");
      // if (!user) {
      //   return next(new ApiError("User Not Found.", 404));
      // }

      if (
        !user?.role_id ||
        user?.role_id?.status == false ||
        user?.role_id?.deleted_at !== null
      ) {
        // return next(new ApiError("User role not found or disabled.", 403));
        return res.status(403).json({
          result: [],
          status: false,
          message: 'User role not found or role is disabled.',
        });
      }

      const isAuthorized = user?.role_id?.permissions?.[name]?.[key];
      if (isAuthorized != true) {
        return res.status(400).json({
          result: [],
          status: false,
          message:
            'Access Denied. You are not allowed to access this api endpoint.',
        });
      }

      next();
    } catch (error) {
      next(new ApiError(SomethingWrong, 500));
    }
  };
};

export default RolesPermissions;
