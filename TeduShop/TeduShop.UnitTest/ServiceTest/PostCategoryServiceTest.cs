using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduShop.Data.Infrastructure;
using TeduShop.Data.Repositories;
using TeduShop.Model.Models;
using TeduShop.Service;

namespace TeduShop.UnitTest.ServiceTest
{
    [TestClass]
    public class PostCategoryServiceTest
    {
        private Mock<IPostCategoryRepository> _mockRepository;
        private Mock<IUnitOfWork> _mockUnitOfWork;
        private IPostCategoryService _categoryService;
        private List<PostCategory> listCategory;

        [TestInitialize]
        public void Initialize()
        {
            _mockRepository = new Mock<IPostCategoryRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _categoryService = new PostCategoryService(_mockRepository.Object, _mockUnitOfWork.Object);

            listCategory = new List<PostCategory>()
            {
                new PostCategory() {ID = 1,Name="DM1",Status=true },
                new PostCategory() {ID = 2,Name="DM2",Status=true },
                new PostCategory() {ID = 3,Name="DM3",Status=true }
            };
        
        }
        
        [TestMethod]
        public void PostCategory_Service_GetAll()
        {
            //setup method
            _mockRepository.Setup(m => m.GetAll(null)).Returns(listCategory);

            //call method
            var result = _categoryService.GetAll() as List<PostCategory>;

            // Compare  
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count);

        }

        [TestMethod]
        public void PostCategory_Service_Create()
        {
            PostCategory category = new PostCategory();
            category.Name = "Test";
            category.Alias = "test";
            category.Status = true;

            _mockRepository.Setup(n => n.Add(category)).Returns((PostCategory p) =>
                {
                    p.ID = 2;
                    return p;
                }
            );

            var result = _categoryService.Add(category);

            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.ID);
        }
    }
}
