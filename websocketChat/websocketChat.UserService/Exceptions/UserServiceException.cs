using websocketChat.Core.Exceptions;

namespace websocketChat.UserService.Exceptions
{
    public class UserServiceException : ExceptionBase
    {
        private int code = 1000;
        public override int Code
        {
            get => code + base.Code;
            set => code = value;
        }

        public UserServiceException(string message) : base(message)
        {
        }
    }
}