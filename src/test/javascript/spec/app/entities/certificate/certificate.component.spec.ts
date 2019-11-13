/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import CertificateComponent from '@/entities/certificate/certificate.vue';
import CertificateClass from '@/entities/certificate/certificate.component';
import CertificateService from '@/entities/certificate/certificate.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('Certificate Management Component', () => {
    let wrapper: Wrapper<CertificateClass>;
    let comp: CertificateClass;
    let certificateServiceStub: SinonStubbedInstance<CertificateService>;

    beforeEach(() => {
      certificateServiceStub = sinon.createStubInstance<CertificateService>(CertificateService);
      certificateServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CertificateClass>(CertificateComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          certificateService: () => certificateServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      certificateServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCertificates();
      await comp.$nextTick();

      // THEN
      expect(certificateServiceStub.retrieve.called).toBeTruthy();
      expect(comp.certificates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      certificateServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeCertificate();
      await comp.$nextTick();

      // THEN
      expect(certificateServiceStub.delete.called).toBeTruthy();
      expect(certificateServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
