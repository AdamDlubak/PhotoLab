using System.Collections.Generic;

namespace Server.Helpers{

 public static class JwtConstants
 {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string RolAdmin = "roladmin", RolUser = "roluser", Id = "id";
            }

            public static class JwtClaims
            {
                public const string Admin = "admin";
                public const string User = "user";
      }
        }
    }

}
