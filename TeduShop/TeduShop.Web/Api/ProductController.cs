using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeduShop.Model.Models;
using TeduShop.Service;
using TeduShop.Web.infrastructure.Core;
using TeduShop.Web.Models;
using TeduShop.Web.infrastructure.Extensions;
using System.Web.Script.Serialization;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiControllerBase
    {
        #region Initialize
        IProductService _productService;
        public ProductController(IErrorService errorService, IProductService productService) :
            base(errorService)
        {
            this._productService = productService;
        }
        #endregion

        [Route("getallparents")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productService.GetAll();

                var responseData = Mapper.Map<IEnumerable<ProductViewModel>>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, responseData);
                return response;
            });
        }

        [Route("getall")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request, string keyword, int page, int pageSize = 20)
        {
            return CreateHttpResponse(request, () =>
            {
                int totalRow = 0;
                var model = _productService.GetAll(keyword);

                totalRow = model.Count();

                var query = model.OrderByDescending(x => x.CreatedDate).Skip(page * pageSize).Take(pageSize);

                var responseData = Mapper.Map<IEnumerable<ProductViewModel>>(query);

                var paginationSet = new PaginationSet<ProductViewModel>()
                {
                    Items = responseData,
                    Page = page,
                    TotalCount = totalRow,
                    TotalPages = (int)Math.Ceiling((decimal)totalRow / pageSize)
                };
                var response = request.CreateResponse(HttpStatusCode.OK, paginationSet);
                return response;
            });
        }

        [Route("getbyid/{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetById(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productService.GetByID(id);

                var responseData = Mapper.Map<ProductViewModel>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, responseData);

                return response;
            });
        }

        [Route("create")]
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Create(HttpRequestMessage request, ProductViewModel productVM)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                var newProduct = new Product();
                newProduct.CreatedDate = DateTime.Now;
                newProduct.UpdateProduct(productVM);
                _productService.Add(newProduct);
                _productService.Save();
                var responseData = Mapper.Map<Product, ProductViewModel>(newProduct);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);
                return response;
            });
        }

        [Route("update")]
        [HttpPut]
        [AllowAnonymous]
        public HttpResponseMessage Update(HttpRequestMessage request, ProductViewModel productVM)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                var dbCategory = _productService.GetByID(productVM.ID);
                dbCategory.UpdatedDate = DateTime.Now;
                dbCategory.UpdateProduct(productVM);
                _productService.Update(dbCategory);
                _productService.Save();
                var responseData = Mapper.Map<Product, ProductViewModel>(dbCategory);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);
                return response;
            });
        }

        [Route("delete")]
        [HttpDelete]
        [AllowAnonymous]
        public HttpResponseMessage Delete(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                var oldProduct = _productService.Delete(id);
                _productService.Save();
                var responseData = Mapper.Map<Product, ProductViewModel>(oldProduct);
                response = request.CreateResponse(HttpStatusCode.Created, responseData);
                return response;
            });
        }

        [Route("deletemulti")]
        [HttpDelete]
        [AllowAnonymous]
        public HttpResponseMessage DeleteMulti(HttpRequestMessage request, string checkedProducts)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var listProduct = new JavaScriptSerializer().Deserialize<List<int>>(checkedProducts);
                    foreach (var item in listProduct)
                    {
                        _productService.Delete(item);
                    }
                    _productService.Save();
                    response = request.CreateResponse(HttpStatusCode.Created, listProduct.Count);
                }
                return response;
            });
        }
    }
}
