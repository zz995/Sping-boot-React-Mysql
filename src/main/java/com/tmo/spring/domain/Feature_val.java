package com.tmo.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name="feature_val")
public class Feature_val {
    private Integer id;
    private String value;
    private Thing thing;
    private Count count;
    private Feature_title feature_title;

    public Feature_val() { }

    public Feature_val(String value) {
        this.value = value;
    }

    public Feature_val(String value, Feature_title feature_title, Thing thing) {
        this.value = value;
        this.thing = thing;
        this.feature_title = feature_title;
    }

    public Feature_val(String value, Feature_title feature_title, Count count) {
        this.value = value;
        this.count = count;
        this.feature_title = feature_title;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "thing_id")
    public Thing getThing() {
        return thing;
    }

    public void setThing(Thing thing) {
        this.thing = thing;
    }

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "feature_title_id")

    public Feature_title getFeature_title() {
        return feature_title;
    }

    public void setFeature_title(Feature_title feature_title) {
        this.feature_title = feature_title;
    }

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "count_id")
    public Count getCount() {
        return count;
    }

    public void setCount(Count count) {
        this.count = count;
    }
}
