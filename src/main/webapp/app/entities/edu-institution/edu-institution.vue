<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('mymentorApp.eduInstitution.home.title')" id="edu-institution-heading">Edu Institutions</span>
            <router-link :to="{name: 'EduInstitutionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-edu-institution">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('mymentorApp.eduInstitution.home.createLabel')">
                    Create a new Edu Institution
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <div class="row">
            <div class="col-sm-12">
                <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
                    <div class="input-group w-100 mt-3">
                        <input type="text" class="form-control" name="currentSearch" id="currentSearch"
                            v-bind:placeholder="$t('mymentorApp.eduInstitution.home.search')"
                            v-model="currentSearch" />
                        <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
                            <font-awesome-icon icon="search"></font-awesome-icon>
                        </button>
                        <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()"
                            v-if="currentSearch">
                            <font-awesome-icon icon="trash"></font-awesome-icon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && eduInstitutions && eduInstitutions.length === 0">
            <span v-text="$t('mymentorApp.eduInstitution.home.notFound')">No eduInstitutions found</span>
        </div>
        <div class="table-responsive" v-if="eduInstitutions && eduInstitutions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('mymentorApp.eduInstitution.name')">Name</span></th>
                    <th><span v-text="$t('mymentorApp.eduInstitution.description')">Description</span></th>
                    <th><span v-text="$t('mymentorApp.eduInstitution.url')">Url</span></th>
                    <th><span v-text="$t('mymentorApp.eduInstitution.address')">Address</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="eduInstitution in eduInstitutions"
                    :key="eduInstitution.id">
                    <td>
                        <router-link :to="{name: 'EduInstitutionView', params: {eduInstitutionId: eduInstitution.id}}">{{eduInstitution.id}}</router-link>
                    </td>
                    <td>{{eduInstitution.name}}</td>
                    <td>{{eduInstitution.description}}</td>
                    <td>{{eduInstitution.url}}</td>
                    <td>
                        <div v-if="eduInstitution.addressId">
                            <router-link :to="{name: 'AddressView', params: {addressId: eduInstitution.addressId}}">{{eduInstitution.addressCity}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EduInstitutionView', params: {eduInstitutionId: eduInstitution.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EduInstitutionEdit', params: {eduInstitutionId: eduInstitution.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(eduInstitution)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="mymentorApp.eduInstitution.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-eduInstitution-heading" v-bind:title="$t('mymentorApp.eduInstitution.delete.question')">Are you sure you want to delete this Edu Institution?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-eduInstitution" v-text="$t('entity.action.delete')" v-on:click="removeEduInstitution()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./edu-institution.component.ts">
</script>
