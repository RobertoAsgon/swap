import HttpAdapter from "../../lib/HttpAdapter";
import { GET_USER_DATA_ERROR } from "./userConstants";
import { UserDataAccount } from "./userModel";

class UserService {
  constructor(private http: HttpAdapter) {}

  async getUserDataByAddress(address: string): Promise<UserDataAccount> {
    try {
      const { data } = await this.http.get<UserDataAccount>(
        `${process.env.NEXT_PUBLIC_URL_BASE_SSD_ENV}/user/getUserByAddress`,
        {
          params: {
            address,
          },
        }
      );

      return data;
    } catch (error) {
      throw new Error(GET_USER_DATA_ERROR);
    }
  }
}

export default UserService;
