import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";

const services = {

    getPasswords: function () {
        fetch("/passwords")
            .then(result => result.json())
            .then(data =>
                this.setState({passwords: data, searchText: "", editMode: false})
            )
            .catch(err => console.log(err));
    },

    deletePassword: function (id) {
        fetch("/delete/" + id, {method: "delete"}).then(() =>
            services.getPasswords.call(this)
        );
    },

    update: function (data) {
        return fetch("/update", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    },

    handleSearch: function (text) {
        if (!text || text.trim().length === 0) {
            services.getPasswords.call(this)
        } else {
            fetch("/search/" + text)
                .then(result => result.json())
                .then(passwords => this.setState({passwords: passwords}));
        }
    }


}

export default services;
