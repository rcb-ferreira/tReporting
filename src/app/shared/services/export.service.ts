import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    downloadFile(data, filename = 'data') {
        const csvData = this.ConvertToCSV(data['rows'], data['headers']);
        const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        const dwldLink = document.createElement('a');
        const url = URL.createObjectURL(blob);
        const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
        if (isSafariBrowser) {
            // if Safari open in new window to save file with random filename.
            dwldLink.setAttribute('target', '_blank');
        }
        dwldLink.setAttribute('href', url);
        dwldLink.setAttribute('download', filename + '.csv');
        dwldLink.style.visibility = 'hidden';
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(objArray, headerList) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'S.No,';
        headerList.forEach(index => {
          row += index + ',';
        });
        row = row.slice(0, -1);
        str += row + '\r\n';

        for (let i = 0; i < array.length; i++) {
            let line = i + 1 + '';
            headerList.forEach((element, index) => {
              row += index + ',';
              const head = headerList[index];
              line += ',' + array[i][head];
            });
            str += line + '\r\n';
        }

        return str;
    }
}
