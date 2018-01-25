using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;

namespace TeduShop.Data.Repositories
{
    public interface IProductTagRepository : IRepository<ProductTag>
    {

    }
    class ProductTagRepository : RepositoryBase<ProductTag>,IProductTagRepository
    {
        protected ProductTagRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}
