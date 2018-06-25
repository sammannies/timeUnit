var timeUnitContract = function() {
  // Data stored by the smart contract
  LocalContractStorage.defineMapProperty(this, "hash_to_t") // Max, Number, Data, Date
}

timeUnitContract.prototype = {
  // init is called once, when the contract is deployed.
  init: function() { },

  requesttimeUnit: function (gunit,gnumber,wunit) {
    if(Blockchain.transaction.value != 0) { // Users only pay the gas fee.
        throw new Error("I don't want your money.");
    }
    var wnumber = 0;
    if(gunit=='seconds' || gunit=='sec'){
      if(wunit=='seconds' || wunit=='sec'){
        wnumber=gnumber;
      }
      else if(wunit=='minutes' || wunit=='min'){
        wnumber=(gnumber/60);
      }
      else if(wunit=='hours' || wunit=='h'){
        wnumber=(gnumber/3600);
      }
      else if(wunit=='days' || wunit=='d'){
        wnumber=(gnumber/(3600*24));
      }
    }
    else if(gunit=='minutes' || gunit=='min'){
      if(wunit=='minutes' || wunit=='min'){
        wnumber=(gnumber);
      }
      else if(wunit=='seconds' || wunit=='sec'){
        wnumber=(gnumber*60);
      }
      else if(wunit=='hours' || wunit=='h'){
        wnumber=(gnumber/60);
      }
      else if(wunit=='days' || wunit=='d'){
        wnumber=(gnumber/(60*24));
      }
    }
    else if(gunit=='hours' || gunit=='h'){
      if(wunit=='hours' || wunit=='h'){
        wnumber=(gnumber);
      }
      else if(wunit=='seconds' || wunit=='sec'){
        wnumber=(gnumber*3600);
      }
      else if(wunit=='minutes' || wunit=='min'){
        wnumber=(gnumber*60);
      }
      else if(wunit=='days' || wunit=='d'){
        wnumber=(gnumber/(24));
      }
    }
    else if(gunit=='days' || gunit=='d'){
      if(wunit=='days' || wunit=='d'){
        wnumber=gnumber;
      }
      else if(wunit=='seconds' || wunit=='sec'){
        wnumber=(gnumber*3600*24);
      }
      else if(wunit=='minutes' || wunit=='min'){
        wnumber=(gnumber*60*24);
      }
      else if(wunit=='hours' || wunit=='h'){
        wnumber=(gnumber*24);
      }
    }

    this.hash_to_t.put(Blockchain.transaction.hash, {wunit, wnumber, date: Date.now()});
  },

  gettimeUnit: function (hash) {
    return this.hash_to_t.get(hash);
  },
}

module.exports = timeUnitContract
