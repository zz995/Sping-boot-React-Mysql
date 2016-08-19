package com.tmo.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="category")
public class BeanTest {
    private int id;
    private String name;
    private int level;
    private int leftNode;
    private int rightNode;
    private Set<Thing> things;

    public BeanTest() {
    }

    public BeanTest(int id) {
        this.id = id;
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
}
