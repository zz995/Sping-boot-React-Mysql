package com.tmo.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name="thing")
public class Thing {

    private int id;
    private String name;
    private Set<Count> counts;
    private Set<Feature_val> feature_vals;
    private Set<Category> categories;

    public Thing() { }

    public Thing(String name) {
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

    @JsonManagedReference
    @OneToMany(mappedBy = "thing", cascade = CascadeType.ALL)
    public Set<Count> getCounts() {
        return counts;
    }

    public void setCounts(Set<Count> counts) {
        this.counts = counts;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "thing", cascade = CascadeType.ALL)
    public Set<Feature_val> getFeature_vals() {
        return feature_vals;
    }

    public void setFeature_vals(Set<Feature_val> feature_vals) {
        this.feature_vals = feature_vals;
    }

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "thing_category",
            joinColumns = { @JoinColumn(name = "thing_id", referencedColumnName = "id") },
            inverseJoinColumns = { @JoinColumn(name = "category_id", referencedColumnName = "id") }
    )
    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }


}
