<template>
  <div class="form-container">
    <h2><b>Please fill the form.</b></h2>
    <form @submit="submitForm">
      <div class="form-group">
        <label for="firstName" class="label-overlap">First Name:</label>
        <input type="text" class="form-control input-custom" v-model="customer.firstName" id="firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName"  class="label-overlap">Last Name:</label>
        <input type="text" class="form-control input-custom" id="lastName" v-model="customer.lastName" required />
      </div>
      <div class="form-group">
        <label for="address"  class="label-overlap">Address:</label>
        <input type="text" class="form-control input-custom" id="address" v-model="customer.address" required />
      </div>
      <div class="form-group">
        <label for="phone"  class="label-overlap">Phone:</label>
        <input type="tel" class="form-control input-custom" id="phone" v-model="customer.phone" required />
      </div>
      <div class="form-group">
        <label for="age"  class="label-overlap">Age:</label>
        <input type="number" class="form-control input-custom" id="age" v-model="customer.age" required />
      </div>
      <div class="form-group">
        <label for="email"  class="label-overlap">Email:</label>
        <input type="email" class="form-control input-custom" id="email" v-model="customer.email" required />
        <small v-if="!isEmailValid" class="form-text text-danger">Please enter a valid email address.</small>
      </div>
      <div class="form-group">
        <label for="birthDate"  class="label-overlap">Birth Date:</label>
        <input type="date" class="form-control input-custom" id="birthDate" v-model="customer.birthDate" required />
      </div>
      <div class="form-group">
        <label for="userType"  class="label-overlap">User Type:</label>
        <select id="userType" class="form-control input-custom" v-model="customer.customerTypeId" required>
          <option disabled value="">Please select a user type</option>
          <option v-for="type in customerTypes" :key="type.id" :value="type.id">{{ type.type }}</option>
        </select>
      </div>

      <!-- Other form fields -->

      <button type="submit" class="btn btn-primary btn-custom">{{ isEditing ? "Update" : "Submit" }}</button>
    </form>
  </div>
</template>

<style>
@import "@/assets/style/styles.css";
</style>

<script>
export default {
  props: {
    customer: Object,
    isEditing: Boolean,
    customerTypes: Object,
  },
  data() {
    return {
      isEmailValid: true,
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();

        // Validate email address
      if (!this.isValidEmail(this.customer.email)) {
        this.isEmailValid = false;
        return;
      }

      this.isEmailValid = true;

      if (event.target.checkValidity()) {
        // Gather the form data
        const formData = {
          id: this.customer.id,
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          address: this.customer.address,
          phone: this.customer.phone,
          email: this.customer.email,
          age: this.customer.age,
          birthDate: this.customer.birthDate,
          customerTypeId: this.customer.customerTypeId,
        };

        // Emit the form data to the parent component
        this.$emit('form-submitted', formData);
      } else {
        // Form is invalid, handle validation error
        console.log('Form is invalid');
      }
    },
    isValidEmail(email) {
      // Email validation regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>
