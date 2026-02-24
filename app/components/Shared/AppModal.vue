<script lang="ts" setup>
defineProps<{
  id: string
}>()
</script>

<template>
  <dialog
    :id="id"
    class="gallery-dialog"
    closedby="any"
  >
    <div class="header">
      <button
        commandfor="gallery"
        command="close"
        class="btn-close"
      >
        <icon
          name="solar:close-circle-bold"
          class="icon"
        />
      </button>
    </div>
    <slot />
  </dialog>
</template>

<style lang="css" scoped>
dialog {
  width: calc(100vw - (var(--spacing-4) * 2));
  max-width: 1280px;
  padding: 0;
  background-color: rgb(0 0 0 / 100%);
  border: 0;
  transition: opacity var(--transition);

  &[open] {
    animation: show-dialog var(--transition);

    &::backdrop {
      animation: show-backdrop var(--transition);
    }
  }
}

.btn-close {
  font-size: 2em;
  cursor: pointer;
}

::backdrop {
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(3px);
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: end;
  padding: var(--spacing-2) var(--spacing-4);
}

@keyframes show-dialog {
  from {
    opacity: 0;
    scale: 0.99;
    translate: 0 -1em;
  }

  to {
    opacity: 1;
    scale: 1;
    translate: 0 0;
  }
}

@keyframes show-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
