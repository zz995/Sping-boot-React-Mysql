package com.tmo.spring.web;

import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.tmo.spring.domain.Thing;
import com.tmo.spring.repository.CategoryRepository;
import com.tmo.spring.domain.Category;
import com.tmo.spring.domain.BeanTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import static java.lang.System.out;
import java.util.Collection;
import org.springframework.transaction.annotation.Transactional;
import static java.lang.System.out;
import com.tmo.spring.error.NotFoundException;
import java.util.Set;
import jodd.json.JsonSerializer;

@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepo;

    public static class CategoryData {
        private int parentId;
        private String name;

        public int getParentId() {
            return parentId;
        }
        public void setParentId(int parentId) {
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
    public ResponseEntity<?> create(@RequestBody CategoryData data) {

        out.println("_________________________________________");
        out.println(data.getName());
        out.println("_________________________________________");

        int right = (int)categoryRepo.count() * 2;
        if (right > 0) {
            right--;
        }
        int level = 0;
        Category cat;
        if (right == 0) {
            cat = new Category();
            cat.setLeftNode(0);
            cat.setRightNode(1);
            cat.setLevel(level);
            categoryRepo.save(cat);
            right = 1;
        } else {
            if (data.parentId != 0) {
                cat = categoryRepo.findById(data.parentId);
                if (cat == null) {
                    throw new NotFoundException("Category with id " + data.parentId + " is not found.");
                }

                right = cat.getRightNode();
                level = cat.getLevel();
/*                out.println("_________________________________________");
                out.println(right);
                out.println("_________________________________________");*/
            }
        }
        categoryRepo.updateKey(right);
        categoryRepo.updateNode(right);
        Category categ = new Category();
        categ.setLeftNode(right);
        categ.setName(data.getName());
        categ.setRightNode(right  + 1);
        categ.setLevel(level + 1);
        categoryRepo.save(categ);

        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<>(categ, responseHeaders, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/api/category/{categoryId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable int categoryId) {
        Category categ = categoryRepo.findById(categoryId);

        if (categ == null) {
            throw new NotFoundException("Category with id " + categoryId + " is not found.");
        }

        String categJson = new JsonSerializer().serialize(categ);

        int left = categ.getLeftNode();
        int right = categ.getRightNode();

        categoryRepo.deleteNode(right, left);
        categoryRepo.updateParentNode(right, left);
        categoryRepo.updateLastNode(right, left);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Content-Type", "application/json");
        return new ResponseEntity<>(categJson, responseHeaders, HttpStatus.OK);
    }


    @RequestMapping(value = "/api/category", method = RequestMethod.GET)
    public ResponseEntity<?> get() {
        Set<Category> categ = categoryRepo.findAllByOrderByLeftNodeAsc();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Content-Type", "application/json");
        return new ResponseEntity<>(
                new JsonSerializer().exclude("leftNode", "rightNode").serialize(categ), responseHeaders, HttpStatus.OK
        );
    }

    @RequestMapping(value = "/api/category/{categoryId}/feature", method = RequestMethod.GET)
    public ResponseEntity<?> getFeature(@PathVariable int categoryId) {
        Category categ = categoryRepo.findById(categoryId);

        if (categ == null) {
            throw new NotFoundException("Category with id " + categoryId + " is not found.");
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<>(
                categoryRepo.featureByCategory(categ.getRightNode(), categ.getLeftNode()),
                responseHeaders,
                HttpStatus.OK
        );
    }

    @RequestMapping(value = "/api/category/{categoryId}", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody CategoryData data, @PathVariable int categoryId) {
        Category categ = categoryRepo.findById(categoryId);
        if (categ == null) {
            throw new NotFoundException("Category with id " + data.parentId + " is not found.");
        }

        categ.setName(data.name);
        categoryRepo.save(categ);

        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<>(categ, responseHeaders, HttpStatus.OK);
    }


}
