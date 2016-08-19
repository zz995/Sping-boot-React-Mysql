package com.tmo.spring.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Type;

import java.util.Set;

@Entity
@Table(name="count")
public class Count {

    private int id;
    private int number;
    private Thing thing;
    private Set<Feature_val> feature_vals;

    public Count() { }

    public Count(int number) {
        this.number = number;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
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
