'use strict';

import CategoryActions from '../actions/CategoryActions';

export default {

    getCategoryData() {
        fetch('/api/category')
            .then(res => res.json())
            .then(data => {
                CategoryActions.receiveCategory(data);
            });
        //.catch(() => console.log('Данные не полученны'));
    },

    getFeature(id) {
        fetch(`/api/category/${id}/feature`)
            .then(res => res.json())
            .then(data => {
                CategoryActions.receiveFeature(data);
            });
        //.catch(() => console.log('Данные не полученны'));
    },

    create(data) {

        fetch('/api/category', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(
                res => res.json()
            )
            .then(res => {
                res.parentId = data.parentId;
                CategoryActions.addData(res);
            })
            //.catch(err => console.log('Request failed', error))
    },

    remove(id) {
        fetch(`/api/category/${id}`, {
            method: 'delete',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(
                () => CategoryActions.remove(id)
            )
    }
}