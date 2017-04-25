// data: null
// file: pipe/index-base.pipe.ts
export const indexBasePipeTpl = `// Generated by node-private-tools
import { Pipe, PipeTransform } from '@angular/core';
import { XlangJsonService } from 'ng-ef-alone/xlang';

export abstract class IndexBasePipe implements PipeTransform {
  private tr: string[] = [];
  private sub: any;

  constructor(private xlangJsonService: XlangJsonService, private xlangId: string) { }

  transform(index: number) {
    if (!this.sub) {
      this.sub = this.xlangJsonService.load(this.xlangId).subscribe(tr => this.tr = tr);
    }
    return this.tr[index] || '';
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
`;

// data: ConstType
// file: pipe/{pipe}.pipe.ts
// xlangId: {pipe}
export const pipeTpl = `// Generated by node-private-tools
import { Pipe, PipeTransform } from '@angular/core';
import { XlangJsonService } from 'ng-ef-alone/xlang';
import { IndexBasePipe } from './index-base.pipe';

@Pipe({
  name: '{{{pipe}}}',
  pure: false,
})
export class {{{type}}}Pipe extends IndexBasePipe implements PipeTransform {
  constructor(xlangJsonService: XlangJsonService) {
    super(xlangJsonService, '{{{pipe}}}');
  }
}
`;

// data: ConstType[] as types
// file: pipe.ts
export const pipeIndexTpl=`// Generated by node-private-tools
{{#each types}}import { {{{type}}}Pipe } from './pipe/{{{pipe}}}.pipe';
{{/each}}

{{#each types}}export * from './pipe/{{{pipe}}}.pipe';
{{/each}}

export const GO_CONST_PIPES = [
{{#each types}}  {{{type}}}Pipe,
{{/each}}
];
`;

// data: ConstType
// file: enum/{pipe}.enum.ts
// xlangId: pipe
export const enumTpl = `// Generated by node-private-tools
export enum {{{type}}} {
  {{{names}}}
}
`;

// data: ConstType[] as types
// file: enum.ts
export const enumIndexTpl=`// Generated by node-private-tools
{{#each types}}export * from './enum/{{{pipe}}}.enum';
{{/each}}
`;

// names
// data: ConstType.names
// file: names/{pipe}.json

// xlangJson
// data: ConstType ConstTypeTrs
// file: xlang/{pipe}/{lang}.json

// errors
// data: Prettier.errors
// file: go-const-errors.log
