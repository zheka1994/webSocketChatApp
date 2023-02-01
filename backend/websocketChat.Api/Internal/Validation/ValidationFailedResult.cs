using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace websocketChat.Api.Internal.Validation
{
    public class ValidationFailedResult : ObjectResult
    {
        private readonly ModelStateDictionary _dictionary;
        public ValidationFailedResult(ModelStateDictionary dictionary) : base(dictionary)
        {
            _dictionary = dictionary;
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            var result = new ObjectResult(
                new ValidationResultModel(_dictionary)
            )
            {
                StatusCode = StatusCodes.Status422UnprocessableEntity
            };
            await result.ExecuteResultAsync(context);
        }
        
    }
}