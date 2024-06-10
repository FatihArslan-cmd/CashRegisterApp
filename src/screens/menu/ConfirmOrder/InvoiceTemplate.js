
const getInvoiceHTML = ({ formattedDateTime, salesNo, userProfile, productData, receivedAmount, change, subTotal, allTotal, paymentType }) => {
    return `
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <style>
          .flex-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .flex-row {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Date:${formattedDateTime}</h2>
        <div class="flex-container">
          <h2 style="font-size: 50px; font-family: Courier New; font-weight: bold;">32Bit</h2>
          <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Kemalpaşa, Esentepe Kampüsü, Üniversite Cd., 54050 Serdivan/Sakarya</p>
          <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Sales no: ${salesNo}</p>
          <div class="flex-row"> 
          ${userProfile ? `
            <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Payment Type: ${paymentType}  <br/>  Cashier: ${userProfile.email}</p>
            ` : ''}
          </div>
        </div>
        <hr/>
        <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">
        
        ${productData.map(product => `
        <p>${product.name}: ${product.price}$ | KDV :${product.kdv}% | 1 PCS  </p>
      `).join('')}
           
        </h2>
        <hr/>
        <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Received Money :${receivedAmount}$ <br/>Change :${change}$</h2>
        <hr/>
        <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Subtotal :${subTotal}$ <br/>AllTotal :${allTotal}$</h2>
        <hr/>
        
      </body>
      </html>
    `;
  };
  
  export default getInvoiceHTML;