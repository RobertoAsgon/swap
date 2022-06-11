import HttpAdapter from "../../lib/HttpAdapter";
import { GET_USER_DATA_ERROR } from "./userConstants";
import { UserDataAccount } from "./userModel";

class UserService {
  constructor(private http: HttpAdapter) {}

  async getUserDataByAddress(address: string): Promise<UserDataAccount> {
    try {
      console.log('process.env.NEXT_PUBLIC_URL',process.env.NEXT_PUBLIC_URL)
      const { data } = await this.http.get<UserDataAccount>(
        `${process.env.NEXT_PUBLIC_URL}/user/getUserByAddress`,
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
