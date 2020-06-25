const router = require('express').Router();
const env = require('./Variables');
console.log(env.STRIPE_KEY)
const stripe = require('stripe')(env.STRIPE_KEY);
const Token = require('./schema');

exports.getTokens = (req,res) => {

stripe.coupons.list(
  
  function(err, coupons) {
      res.json(coupons.data);
      if (err){
        res.status(400).json('Error: ' + err);
      }
  }
);

    // console.log(":")
    // Token.find()
    // .then(products => {console.log(products);})
    // .catch(err => res.status(400).json('Error: ' + err));

}
fetchData = (body) => {

}
exports.postToken = (req, res) => {
  console.log(req.body.data);
  console.log('Adding a product');
  const name = req.body.data.couponName;
  let percent_off = 0; let amount_off = 0; let currency = ''; let duration_in_months = 0; let duration = '';
  let new_coupon = {};
  const forever = req.body.data.couponDuration.toLowerCase();
  if (req.body.data.USD_Percentage === 'usd' && forever === 'forever')
  {
    console.log('case 1')
    amount_off = req.body.data.couponValue;
    currency = 'usd';
    duration = 'forever';
    new_coupon = {
      duration: duration,
      currency: currency,
      amount_off: amount_off,
      name:name
    };
  }
  else if (req.body.data.USD_Percentage === 'usd' && forever !== 'forever')
  {
    console.log('case 2')
    amount_off = req.body.data.couponValue;
    currency = 'usd'
    duration = 'repeating';
    duration_in_months = req.body.data.couponDuration;

    new_coupon = {
      duration: duration,
      currency: currency,
      amount_off: amount_off,
      duration_in_months: duration_in_months,
      name:name
    };

  }  
  else if (req.body.data.USD_Percentage === '%' && forever === 'forever'){
    console.log('case 3')
    percent_off = req.body.data.couponValue;
    duration = 'forever';
    new_coupon = {
      percent_off: percent_off,
      duration: duration,
      name:name
    }
  }
    else if (req.body.data.USD_Percentage === '%' && forever !== 'forever'){
      console.log('case 4')
      percent_off = req.body.data.couponValue;
      duration = 'repeating';
      duration_in_months = req.body.data.couponDuration;  
      
      new_coupon = {
        duration: duration,
        duration_in_months: duration_in_months,
        percent_off: percent_off,
        name:name
      }
      //console.log(new_coupon)
    }
  console.log(new_coupon)
  stripe.coupons.create(
    new_coupon
    ,
    function(err, coupon) {
      console.log(coupon);
      res.json(coupon);
      //console.log(err);
      
      // asynchronously called
    }
  );  
  // console.log("AAAA");
    // const id = 'nwaygqu2';
    // const token = 'Bundle Offer';
    // const percent_off = 10;

    // const newToken = new Token({id,token,percent_off});
    
    // newToken.save()
    // .then(() => res.json('Coupon added!'))
    // .catch(err => res.status(400).json('Error1: ' + err));
  };

   
exports.deleteToken = (req, res) => {
    console.log("Deleting a product");
    console.log(req.params.id);
    stripe.coupons.del(
      req.params.id,
      function(err, confirmation) {
        if (err){
          res.status(400).json('Error1: ' + err)
        }
        if (confirmation)
        {
          if (confirmation.deleted){
            res.json('Coupon deleted!');
          }
        }
        else{
          //Token not found logic

        }
        // asynchronously called
      }
    );

    // Product.findByIdAndDelete(req.params.id)
    // .then(() => res.json('Product deleted.'))
    // .catch(err => res.status(400).json('Error: ' + err));
};

exports.updateToken = (req, res) => {
};
 
