using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels
{
    public class UserChangePasswordViewModel
    {
    public string Id { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmPassword { get; set; }

  }
}
