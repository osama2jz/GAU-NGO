import { PDFDownloadLink } from 'react-to-pdf';

import React from 'react'
import Button from '../../../Components/Button';
import { useRef ,useEffect} from 'react';
import Document from "../ViewUser/index.jsx"

const MyDocument = () => {
    useEffect(() => {
      savePdf(
        <Document>
          <Page>
            <MyComponent />
          </Page>
        </Document>
      );
    }, []);
  
    return null;
  };

function userPdf() {
    const componentRef = useRef();
    
    return (
        <div>
            {/* <Document ref={componentRef} /> */}
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
            hello

        </div>
    )
}

export default userPdf