const getAccountList = async () => {
  const accountList = await window.api.invoke("PASSMANAGER::GetAccountList");
  return accountList;
}
