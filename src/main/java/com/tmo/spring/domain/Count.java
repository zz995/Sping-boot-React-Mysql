package com.tmo.spring.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Set;

@Entity
@Table(name="count")
public class Count {

    private Integer id;
    private Integer number;
    private Thing thing;
    private Set<Feature_val> feature_vals;

    public Count() { }

    public Count(Integer number) {
        this.number = number;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
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

    @JsonManagedReference
    @OneToMany(mappedBy = "count", cascade = CascadeType.ALL)
    public Set<Feature_val> getFeature_vals() {
        return feature_vals;
    }

    public void setFeature_vals(Set<Feature_val> feature_vals) {
        this.feature_vals = feature_vals;
    }
}
