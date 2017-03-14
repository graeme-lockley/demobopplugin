# BoP Control

The code contained in this file contains a crude JavaScript control which has the purpose of showing off the mechanisms
that are used by the current Investec BoP solution.
 

## Files

The following files have been included in this distribution:

- readme.md: A markdown file describing the purpose of the control and how it can be embedded into a page
- demobopplugin.js: The BoP plugin itself.  The plugin is implemented as a [RequireJS](http://requirejs.org) module.
- demoboppahe.html: An example of how the BoP plugin can be embedded into an HTML page and how the page is able to
interact with the plugin.
- require.js: A minified version of the [RequireJS](http://requirejs.org) library.  Including it means that the demo
page can be opened without any dependencies other than the files listed here.


## Solution

The solution is extraordinarily crude in that:
 
- The control only requires two input values - a currency and an amount.  There are no other data requirements.
- The control opens up as an HTML table.
- The control has no styling
- The validations are trivial - only ZAR and USD are supported currencies and the amount must at least be 10.00.
- Other than [RequireJS](http://requirejs.org) I have used no other libraries to make the task any easier and kept to
unadulterated JavsScript and HTML to better illustate the mechanisms.


## Mechanisms

The following sections describe the mechanisms that we use to implement our BoP plugin.


### Load Component

First include the [RequireJS](http://requirejs.org) library using the following HTML:

```HTML
<script src="require.js"></script>
```

As described previously this file is included within the distribution.  Necessarily this library can be pathed or
referenced off of a CDN.

Having included [RequireJS](http://requirejs.org) the plugin is loaded using the following JavaScript

```javascript
require(['demobopplugin'], function(bop) {
    // component initialisation code
    ...
    
    // make functions public within the page so that they can be accessed wherever they are required.
    if (parent) {
        parent.bopGetData = function() {
            return bop.getData();
        };

        parent.bopIsValid = function () {
            return bop.isValid();
        };

        parent.bopErrors = function() {
            return bop.errors();
        }
    }
});
```

All of the above code is placed within the page's ``HTML/HEAD`` element. 


### Initialise Component

There are two processes to initialising the component: the first phase initialises the component's state whilst the
second phase adds HTML into the div element with the ID ``bop-form``.

There are two ways to initialise the component - either on a field by field basis or as a single block of JSON.  Given 
that this demo component has only two fields the following piece of code will initialise the currency to USD and the 
amount to 100.00
 
```javascript
bop.setAmount(100);
bop.setCurrency('USD');
```

Equally all of the fields can be initialised using a single bulk call using the ```setData``` function

```javascript
bop.setData({
    id: 'bop-form',
    amount: 100.0,
    currency: 'USD'
});
```

The reason for the ``setData`` function is that the component has an complementary function ``getData`` which returns 
the component's data in a format that the BoP process is able to understand and process.  Using the combination of these 
two functions it is possible for an application that embeds this component to save a partially completed BoP form and 
then to restore the component to the state that it was in when it was saved.

After the component has been initialised, the function ``show`` is used to inject the necessary HTML into the page
against the div element with ID ``bop-form``.

```javascript
bop.show();
```

### Add Component onto Page

Adding the component onto a page is trivial.  Simply include the following HTML tag

```html
<div id="bop-form"></div>
```


### Interrogating Component

The methods defined when loading the component are available throughout the rest of the HTML page and can used in event 
handlers.

In the demo the following function is attached to the button ``Show`` and has the responsible to display the control's 
state using the ``getData`` function.  Note that because the result is a JavaScript object, in order to display it, the 
object needs to be converted into a string.

```javascript
function showBtn() {
    alert(JSON.stringify(bopGetData()));
}
```

In the demo the following method is attached to the button ``Proceed`` and simulates when the user has completed the
form and would like to continue.  In this case, should the form contain no errors, an alert is displayed stating that
the form is completed otherwise the errors are displayed.


```javascript
function proceedBtn() {
    if (bopIsValid()) {
        alert('BoP form is valid');
    } else {
        alert(bopErrors().join('\n'));
    }
}
```
