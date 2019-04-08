const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_ZCDK4B5lWRJnQM5uJEqQgpf000rlo2uZtf'
    : 'pk_test_ZCDK4B5lWRJnQM5uJEqQgpf000rlo2uZtf';

export default STRIPE_PUBLISHABLE;
