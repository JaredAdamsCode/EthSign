import axios from 'axios';

export const callLambdaFunction = async (requestType, requestBody) =>
{
  try
  {
    return await axios.post("/.netlify/functions/" + requestType, JSON.stringify(requestBody));
  }

  catch(err)
  {
    console.error('Resource Not Found');
  }
};

export const checkURLStatus = (contractUrl, ethAccount, setUrlStatus, setIsContractOwner, produceSnackBar) =>
{
  return callLambdaFunction("getURLStatus", { url: contractUrl })
  .then(r =>
  {
    console.log(r);

    if (r.data[0])
    {
      setIsContractOwner(ethAccount === r.data[0].contractOwner);

      // Look For Entry In Database, If Found, Restore Page

      for (let i = 0; i < r.data[0].urlStatus.length; i++)
      {
        let item = r.data[0].urlStatus[i];
        if (item.address === ethAccount)
        {
          return item.status;
        }
      }

      // New User

      callLambdaFunction("addAccountToExistingURL", { url: contractUrl, address: ethAccount })
      .then(r =>
      {
        console.log(r);
        setUrlStatus(0);
      });
    }

    else
    {
      produceSnackBar("This Contract Address Does Not Exist, Redirecting...");

      setTimeout(() =>
      {
        window.location.href = window.location.protocol + "//" + window.location.host
      }, 3000)
    }
  });
};
