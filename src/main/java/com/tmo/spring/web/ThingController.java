package com.tmo.spring.web;

import com.sun.org.apache.xpath.internal.operations.Bool;
import com.tmo.spring.domain.Category;
import com.tmo.spring.domain.Thing;
import com.tmo.spring.domain.Feature_val;
import com.tmo.spring.domain.Feature_title;
import com.tmo.spring.domain.Count;
import com.tmo.spring.error.NotFoundException;
import com.tmo.spring.repository.CategoryRepository;
import com.tmo.spring.repository.ThingRepository;
import com.tmo.spring.repository.Feature_titleRepository;
import java.util.Collection;

import jodd.json.JsonSerializer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import static java.lang.System.out;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
public class ThingController {
    @Autowired
    ThingRepository thingRepo;

    @Autowired
    Feature_titleRepository featureRepo;

    @Autowired
    CategoryRepository categoryRepo;

    @RequestMapping(value = "/api/thing", method = RequestMethod.GET)
    public List<Thing> get() {

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Content-Type", "application/json");

        return thingRepo.findAll();
    }

    @RequestMapping(value = "/api/thing/{thingId}", method = RequestMethod.GET)
    public Thing getById(@PathVariable Integer thingId) {
        return thingRepo.findById(thingId);
    }


    @RequestMapping(value = "/api/thing/feature", method = RequestMethod.GET)
    public Set<Thing> getByFeature(
            @RequestParam(value="name") String[] nameFeature,
            @RequestParam(value="value") String[] valueFeature,
            @RequestParam(value="category") Integer categoryId
    ) {

        Category category = categoryRepo.findById(categoryId);
        Set<Thing> things;

        things = thingRepo.findCatFeature(
                category.getRightNode(),
                category.getLeftNode(),
                nameFeature,
                valueFeature,
                valueFeature.length
        );

        return things;
    }

    @RequestMapping(value = "/api/thing/category/{categoryId}", method = RequestMethod.GET)
    public Set<Thing> getByCategory(@PathVariable Integer categoryId) {
        Category category = categoryRepo.findById(categoryId);
        return thingRepo.thingsByCategory(category.getRightNode(), category.getLeftNode());
    }

    public static class Feature {
        private String name;
        private String value;
        private Boolean category;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public Boolean getCategory() {
            return this.category = category;
        }

        public void setCategory(Boolean category) {
            this.category = category;
        }

    }

    public static class SubThing {
        private Integer count;
        private List<Feature> features;

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }

        public List<Feature> getFeatures() {
            return features;
        }

        public void setFeatures(List<Feature> features) {
            this.features = features;
        }
    }

    public static class ThingData {
        private String name;
        private Integer[] categories;
        private Feature[] features;
        private Set<SubThing> subThings;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer[] getCategories() {
            return categories;
        }

        public void setCategories(Integer[] categories) {
            this.categories = categories;
        }

        public Feature[] getFeatures() {
            return features;
        }

        public void setFeatures(Feature[] features) {
            this.features = features;
        }

        public Set<SubThing> getSubThings() {
            return subThings;
        }

        public void setSubThings(Set<SubThing> subThings) {
            this.subThings = subThings;
        }

    }

    @RequestMapping(value = "/api/thing", method = RequestMethod.POST)
    public Thing create(@RequestBody ThingData data) {

        Thing thing = new Thing();

        Integer[] categories = data.getCategories();

        Set<Category> categoriesSet = new HashSet<Category>();

        if (categories != null) {

            for (int i = 0; i < categories.length; i++) {
                Category category = categoryRepo.findById(categories[i]);
                if (category == null) {
                    throw new NotFoundException("Category with id " + categories[i] + " is not found.");
                }
                categoriesSet.add(category);
            }

            thing.setCategories(categoriesSet);
        }

        thing.setName(data.getName());

        Map<String, Feature_title> feature_titleMap = new HashMap<>();

        Feature[] features = data.getFeatures();

        if (features != null) {
            Set<Feature_val> feature_vals = new HashSet<Feature_val>();

            for (int i = 0; i < features.length; i++) {

                Feature feature = features[i];

                Feature_title feature_title = feature_titleMap.get(feature.getName());

                if (feature_title == null) {

                    feature_title = featureRepo.findByName(feature.getName());

                    if (feature_title == null) {

                        feature_title = new Feature_title(feature.getName());

                        featureRepo.save(feature_title);

                        feature_titleMap.put(feature.getName(), feature_title);
                    }
                }

                if (feature.category != null) {
                    feature_title.setCategories(categoriesSet);
                    for(Category category : feature_title.getCategories()) {
                        category.getFeature_titles().add(feature_title);
                    }
                    featureRepo.save(feature_title);
                }

                feature_vals.add(new Feature_val(feature.getValue(), feature_title, thing));
            }

            thing.setFeature_vals(feature_vals);
        }

        thingRepo.save(thing);

        return thing;
    }

    @RequestMapping(value = "/api/thing/{thingId}", method = RequestMethod.DELETE)
    public String delete(@PathVariable Integer thingId) {

        thingRepo.deleteById(thingId);

        Integer[] idsFeatureActive = featureRepo.getIds();

        if (idsFeatureActive.length == 0) {
            featureRepo.deleteAll();
        } else {
            featureRepo.deleteFeatureByIds(idsFeatureActive);
       }

       return "{\"id\": " + thingId + "}";
    }
}