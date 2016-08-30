package com.tmo.spring.web;

import com.tmo.spring.domain.Category;
import com.tmo.spring.error.NotFoundException;
import com.tmo.spring.repository.CategoryRepository;
import jodd.json.JsonSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin
@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepo;

    public static class CategoryData {
        private Integer parentId;
        private String name;

        public Integer getParentId() {
            return parentId;
        }
        public void setParentId(Integer parentId) {
            this.parentId = parentId;
        }

        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }

    }

    @RequestMapping(value = "/api/category", method = RequestMethod.POST)
    public Category create(@RequestBody CategoryData data) {

        Integer right = (int)categoryRepo.count() * 2;
        if (right > 0) {
            right--;
        }
        Integer level = 0;
        Category category;
        if (right == 0) {
            category = new Category();
            category.setLeftNode(0);
            category.setRightNode(1);
            category.setLevel(level);
            categoryRepo.save(category);
            right = 1;
        } else {
            if (data.parentId != 0) {
                category = categoryRepo.findById(data.parentId);
                if (category == null) {
                    throw new NotFoundException("Category with id " + data.parentId + " is not found.");
                }

                right = category.getRightNode();
                level = category.getLevel();
            }
        }
        categoryRepo.updateKey(right);
        categoryRepo.updateNode(right);

        category = new Category();
        category.setLeftNode(right);
        category.setName(data.getName());
        category.setRightNode(right  + 1);
        category.setLevel(level + 1);

        categoryRepo.save(category);

        return category;
    }

    @RequestMapping(value = "/api/category/{categoryId}", method = RequestMethod.DELETE)
    public String delete(@PathVariable Integer categoryId) {
        Category categ = categoryRepo.findById(categoryId);

        if (categ == null) {
            throw new NotFoundException("Category with id " + categoryId + " is not found.");
        }

        String categJson = new JsonSerializer().serialize(categ);

        Integer left = categ.getLeftNode();
        Integer right = categ.getRightNode();

        categoryRepo.deleteNode(right, left);
        categoryRepo.updateParentNode(right, left);
        categoryRepo.updateLastNode(right, left);

        return categJson;
    }

    @RequestMapping(value = "/api/category", method = RequestMethod.GET)
    public String get() {
        Set<Category> categ = categoryRepo.findAllByOrderByLeftNodeAsc();

        return new JsonSerializer().exclude("leftNode", "rightNode").serialize(categ);
    }

    @RequestMapping(value = "/api/category/{categoryId}/feature", method = RequestMethod.GET)
    public Set<?> getFeature(@PathVariable Integer categoryId) {
        Category categ = categoryRepo.findById(categoryId);

        if (categ == null) {
            throw new NotFoundException("Category with id " + categoryId + " is not found.");
        }

        return categoryRepo.featureByCategory(categ.getRightNode(), categ.getLeftNode());
    }

    @RequestMapping(value = "/api/category/{categoryId}", method = RequestMethod.PUT)
    public Category update(@RequestBody CategoryData data, @PathVariable Integer categoryId) {
        Category categ = categoryRepo.findById(categoryId);
        if (categ == null) {
            throw new NotFoundException("Category with id " + data.parentId + " is not found.");
        }

        categ.setName(data.name);
        categoryRepo.save(categ);

        return categ;
    }


}
