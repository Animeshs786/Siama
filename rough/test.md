## SVG - Scalable Vector Graphics

1. ### Attributes of `<svg>` tag

   1. `height` - height of image (px)
   2. `width` - width of image (px)

   ```html
   <svg height="100" width="100"></svg>
   ```

2. ### SVG Shapes

   1. `<rect>` Rectangle
   2. `<circle>` Circle
   3. `<ellipse>` Ellipse
   4. `<line>` Line
   5. `<polyline>` Polyline
   6. `<polygon>` Polygon
   7. `<path>` Path

3. ### Rectangle `<rect>`

   #### Attributes of `<rect>` tag

   1. `height` - height of rectangle
   2. `width` - width of rectangle

===========================================

GIT

clone
new branch
change
git push origin newbranch

git pull origin main
delete newbranch

================================
Custom error msg mongoose

Numbers have min and max validators.
Strings have enum, match, minLength, and maxLength validators.

min: [6, 'Must be at least 6, got {VALUE}']
enum: { values: ['Coffee', 'Tea'], message: '{VALUE} is not supported' }

i.e

```js
{
  age: {
    type: Number,
    /*
    {PATH}: the path that failed to cast
    {VALUE}: a string representation of the value that failed to cast
    {KIND}: the type that Mongoose attempted to cast to, like 'String' or 'Number'
    */
    cast: '{VALUE} is not a number',
   //  cast: [null, (value, path, model, kind) => `"${value}" is not a number`]
    min: [18, 'Must be at least 18, got {VALUE}'],
    max: 65,
    required: [true, 'User age is required']
  },
  status: {
    type: String,
    //enum: ['init', 'active','online','offline','busy'],
    enum: {
      values: ['init', 'active','online','offline','busy'],
      message: '{VALUE} is invalid status',
    },
  },
   name: {
    type: String,
    // You can also make a validator async by returning a promise.
    validate: () => Promise.reject(new Error('Oops!'));
    //or
    /*
    There are two ways for an promise-based async validator to fail:
    1) If the promise rejects, Mongoose assumes the validator failed with the given error.
    2) If the promise resolves to `false`, Mongoose assumes the validator failed and creates an error with the given `message`.*/
    validate: {
      validator: () => Promise.resolve(false),
      message: 'Email validation failed'
    }
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email id`
    },

  }
}
```
