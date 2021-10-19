<template>
  <div class="">
    <div class="avatar" data-tooltip="Thinking Cat"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xx: "",
    };
  },
  layout: "none",
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("https://source.unsplash.com/nKC772R_qog");
  background-size: cover;
  background-position: center;
  position: relative;
}

.avatar::before,
.avatar::after {
  --scale: 0;
  --arrow-size: 10px;
  --tooltip-color: #333;

  position: absolute;
  right: -0.25rem;
  top: 50%;
  transform: translateX(var(--translate-x, -100%)) translateY(-50%)
    scale(var(--scale));
  transition: 150ms transform;
  transform-origin: right center;
}

.avatar::before {
  --translate-x: calc(-110% - var(--arrow-size));

  content: attr(data-tooltip);
  color: white;
  padding: 0.5rem;
  border-radius: 0.3rem;
  text-align: center;
  width: max-content;
  max-width: 100%;
  background: var(--tooltip-color);
}

.avatar:hover::before,
.avatar:hover::after {
  --scale: 1;
}

.avatar::after {
  --translate-x: calc(-10 * var(--arrow-size));

  content: "";
  border: var(--arrow-size) solid transparent;
  border-left-color: var(--tooltip-color);
  transform-origin: left center;
}
</style>
