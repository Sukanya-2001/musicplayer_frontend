import { BaseApiResponse } from "./common.interface";
import { userData } from "@/types/common.type";

export interface IgetSignUpQuery extends BaseApiResponse {
  result: userData;
}
