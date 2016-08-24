package com.tmo.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="feature_title")
public class Feature_title {

    private int id;

    private String name;

    private Set<Category> categories;

    public Feature_title() { }

    public Feature_title(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private Set<Feature_val> feature_vals;

    @JsonBackReference
    @OneToMany(mappedBy = "feature_title", cascade = CascadeType.ALL)

    public Set<Feature_val> getFeature_vals() {
        return feature_vals;
    }

    public void setFeature_vals(Set<Feature_val> feature_vals) {
        this.feature_vals = feature_vals;
    }

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "feature_titles", cascade = CascadeType.ALL)
    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
