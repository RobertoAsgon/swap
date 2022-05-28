class UserDataAccount {
  constructor(partial: Partial<UserDataAccount>) {
    Object.assign(this, partial);
  }

  public address = "";
  public name = "";
  public email = "";
  public profile_picture = "";
}

export { UserDataAccount }