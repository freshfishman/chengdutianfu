declare namespace USERMANAGEMENT {
  type USERMANAGEMENT = {
    /**
     * @name 用户ID
     */
    spuId:string,
    /**
     * @name 用户名
     */
    name: string,
    /**
     * @name 是否是管理员
     */
    isAdmin:boolean
  }
  type UPDATEUSERMANAGEMENT = {
    /**
     * @name 用户ID
     */
    spuId:string,
    /**
     * @name 是否是管理员
     */
    isAdmin:boolean
    /**
     * @name 新密码
     */
    newPassword?: string,
    /**
     * @name 新用户名
     */
    newName?: string,
  }
}
