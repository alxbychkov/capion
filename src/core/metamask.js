class MetamaskError extends Error {}

let accountPromiseResolver;

export const accountPromise = new Promise(_accountPromiseResolver => {

  accountPromiseResolver = _accountPromiseResolver;

  const onMetamaskLoad = new Promise(resolve => {

    function handle(){
      if(isConnected()){
        resolve();
      } else {
        if(window.ethereum){
          window.ethereum.on('connect', resolve);
        }
      }
    }

    if(window.ethereum){
      handle();
    } else {
      window.addEventListener('load', handle);
    }

  })

  onMetamaskLoad.then(async () => {
    window.ethereum.on('chainChanged', () => window.location.reload());
    window.ethereum.on('accountsChanged', () => window.location.reload());
    if(localStorage.isMetamaskConnected){
      try {
        await connectMetamask();
      }catch(e){
        if(e instanceof MetamaskError){
          // Could not connect to Metamask on startup, don't show errors and let user 
          // connect manually
          console.log('could not connect to metamask, do nothing', e);
        } else {
          throw e;
        }
      }
    }
  })
})

export function ensureMetamask(){
  if(!window.ethereum){
    throw new MetamaskError('Please install and enable Metamask');
  }
}

export async function connectMetamask(){
  ensureMetamask();

  try {
    const [acc] = await window.ethereum.request({method: 'eth_requestAccounts'});
    localStorage.isMetamaskConnected = true;
    window.ethereum.on('chainChanged', () => window.location.reload());
    accountPromiseResolver(acc);
  } catch(e) {
    let message;
    if(e.code == -32002){
      message = 'Account request is already pending';
    } else {
      message = 'Could not connect to wallet: ' + e.message;
    }
    const error = new MetamaskError(message);
    error.code = e.code;
    throw error;
  }

}

export function isConnected(){
  return window.ethereum && window.ethereum.isConnected();
}
