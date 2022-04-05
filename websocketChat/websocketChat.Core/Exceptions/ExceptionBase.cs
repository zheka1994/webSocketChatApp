using System;

namespace websocketChat.Core.Exceptions
{
    public class ExceptionBase : Exception
    {
        public int code = 1;
        
        public virtual int Code
        {
            get => code;
            set
            {
                code = value;
            }
        }
        public ExceptionBase(string message) : base(message)
        {
            
        }

        public ExceptionBase(string message, int code)
        {
            Code = code;
        }
    }
}