'use strict';

import ThingAction from '../actions/ThingActions';
import CategoryActions from '../actions/CategoryActions';
import InstenseThingActions from '../actions/InstenseThingActions';
import CreateThingActions from '../actions/CreateThingActions';

export default {

    getThings() {
        fetch('/api/thing')
            .then(res => res.json())
            .then(data => {
                ThingAction.receiveThings(data);
            });
        //.catch(() => console.log('Данные не полученны'));
    },

    getByCategory(id) {
        fetch(`/api/thing/category/${id}`)
            .then(res => res.json())
            .then(data => {
                ThingAction.receiveThings(data);
            });
    },

    getThing(id) {
        fetch(`/api/thing/${id}`)
            .then(res => res.json())
            .then(data => {
                InstenseThingActions.receiveThing(data);
            });
    },

    addThing(data) {
        fetch('/api/thing', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(
                () => {
                    CreateThingActions.created();
                }
            )
            .then(
                () => fetch('/api/thing')
            )
            .then(
                res => res.json()
            )
            .then(
                data => {
                    ThingAction.receiveThings(data);
                }
            )

    },

    deleteThing(data) {

        fetch(`/api/thing/${data}`, {
            method: 'delete',
            headers: {
                "Content-type": "application/json"
            },
            body: null
        })
            .then(
                () => fetch('/api/thing')
            )
            .then(
                res => res.json()
            )
            .then(
                data => {
                    ThingAction.receiveThings(data);
                }
            )
    },

    getThingsByFeature(data) {
        const {category, name, value, select, check} = data;

        let query = `/api/thing/feature?category=${category}`;

        select[name][value] = check;

        let queryName = '';
        let queryValue = '';

        for(let keyName in select) {
            let name = false;
            for (let keyValue in select[keyName]) {
                if (select[keyName][keyValue]) {
                    name = true;
                    queryValue += `&value=${keyValue}`;
                }
            }
            if (name) {
                queryName += `&name=${keyName}`;
            }
        }

        if (queryName == '' || queryValue == '') {
            query = `/api/thing/category/${category}`;
        } else {
            query += queryValue + queryName;
        }

        fetch(query)
            .then(res => res.json())
            .then(res => {
                ThingAction.receiveThings(res);
                CategoryActions.checkProp(data);
            });
    }
}