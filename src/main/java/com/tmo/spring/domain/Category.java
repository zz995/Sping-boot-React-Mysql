package com.tmo.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.ParseException;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="category")
public class Category {

    private int id;
    private int level;
    private int leftNode;
    private int rightNode;
    private String name;

   private Set<Feature_title> feature_titles;

    private Set<Thing> things;

    public Category() { }

    public Category(String name) {
        this.name = name;
    }

    public Category(String name, int level) {
        this.name = name;
        this.level = level;
    }

    public Category(String name, int level, int leftNode, int rightNode) {
        this.name = name;
        this.level = level;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }

/*    public Category(String name, Set<Thing> things) {
        this.name = name;
        this.things = things;
    }*/

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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getLeftNode() {
        return leftNode;
    }

    public void setLeftNode(int leftNode) {
        this.leftNode = leftNode;
    }

    public int getRightNode() {
        return rightNode;
    }

    public void setRightNode(int rightNode) {
        this.rightNode = rightNode;
    }

    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "categories", cascade = CascadeType.ALL)
    public Set<Thing> getThings() {
        return things;
    }

    public void setThings(Set<Thing> things) {
        this.things = things;
    }


    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "category_feature_title",
            joinColumns = { @JoinColumn(name = "category_id", referencedColumnName = "id") },
            inverseJoinColumns = { @JoinColumn(name = "feature_title_id", referencedColumnName = "id") }
    )
    public Set<Feature_title> getFeature_titles() {
        return this.feature_titles;
    }

    public void setFeature_titles(Set<Feature_title> feature_titles) {
        this.feature_titles = feature_titles;
    }


/*    @JsonManagedReference*//*("category-feature")*/
/*    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    public Set<Feature_title> getFeature_titles() {
        return feature_titles;
    }

    public void setFeature_titles(Set<Feature_title> feature_titles) {
        this.feature_titles = feature_titles;
    }*/

}
