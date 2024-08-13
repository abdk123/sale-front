import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { FileParameter, FileUploadOutputModel, PdfAndUrnDto, SaleInvoiceDto, SaleInvoiceServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: "pdf-urn",
  templateUrl: "./pdf-urn.component.html",
  styleUrls: ["./pdf-urn.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PdfUrnComponent extends AppComponentBase implements OnInit {
  id: number;
  pdfAndUrn: PdfAndUrnDto = new PdfAndUrnDto();
  pdfFile: FileParameter = { data: "", fileName: "" };

  constructor(
    injector: Injector,
    private _route: ActivatedRoute,
    private _saleInvoiceService: SaleInvoiceServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.id = this._route.snapshot?.params?.id;
    this.initialPdfAndUrn(this.id);
  }

  initialPdfAndUrn(id: number) {
    this._saleInvoiceService
      .getPdfAndUrnById(id)
      .subscribe((result: PdfAndUrnDto) => {
        this.pdfAndUrn = result;
      });
  }

  uploadFile(files) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.pdfFile.fileName = fileToUpload.name;
    this.pdfFile.data = fileToUpload;
  }

  saveFile() {
    if (this.pdfFile.data !== "" || this.pdfFile.fileName !== "") {
      this._saleInvoiceService
        .uploadFile(this.id, this.pdfFile)
        .subscribe((result: FileUploadOutputModel) => {
          if (result.success == true) {
            this.notify.info(this.l("FileUploadedSuccessfully"));
            this.pdfAndUrn.pdfFilePath = result.file.path;
          } else {
            this.notify.info(this.l("ErrorWhenUploadFilePleaseTryAgain"));
          }
        });
    }
  }

  saveUrn(){
    this._saleInvoiceService.addOrEditUrnNumber(this.pdfAndUrn)
    .subscribe((result: SaleInvoiceDto)=>{
      this.notify.info(this.l("UrnNumberSavedSuccessfully"));
    })
  }
}