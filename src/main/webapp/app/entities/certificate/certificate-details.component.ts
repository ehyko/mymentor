import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICertificate } from '@/shared/model/certificate.model';
import CertificateService from './certificate.service';

@Component
export default class CertificateDetails extends Vue {
  @Inject('certificateService') private certificateService: () => CertificateService;
  public certificate: ICertificate = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.certificateId) {
        vm.retrieveCertificate(to.params.certificateId);
      }
    });
  }

  public retrieveCertificate(certificateId) {
    this.certificateService()
      .find(certificateId)
      .then(res => {
        this.certificate = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
