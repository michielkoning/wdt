<script lang="ts" setup>
defineProps<{
  id: string
  title: string
}>()

const emit = defineEmits(['open'])
const dialog = useTemplateRef('dialog')

const afterOpen = () => {
  if (!dialog.value) {
    return
  }
  emit('open')
}
</script>

<template>
  <dialog
    :id="id"
    ref="dialog"
    class="gallery-dialog"
    closedby="any"
    @toggle="afterOpen"
  >
    <div class="header">
      <h2>{{ title }}</h2>
      <button
        :commandfor="id"
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
  @mixin corners var(--spacing-4);

  width: calc(100vw - (var(--spacing-4) * 2));
  max-width: 1280px;
  padding: 0;
  background-color: var(--color-secondary);
  border: 0;
  box-shadow: 0 0 0 2px var(--color-secondary), 0 0 0 3px var(--color-dominant);
  transition: display var(--transition) allow-discrete, overlay var(--transition) allow-discrete;
  animation: dialog-hide var(--transition);

  &[open] {
    animation: dialog-show var(--transition);

    &::backdrop {
      animation: backdrop-show var(--transition);
    }
  }
}

.btn-close {
  font-size: 2em;
  cursor: pointer;
}

::backdrop {
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(0.25em);
  animation: backdrop-hide var(--transition);
}

.header {
  position: sticky;
  top: 0;
  display: flex;
  gap: var(--spacing-2);
  align-items: start;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-4) 0;
  color: var(--text-on-secondary);
  background-color: var(--color-secondary);
}

@keyframes dialog-hide {
  from {
    opacity: 1;
    translate: 0 0;
  }

  to {
    opacity: 0;
    translate: 0 -1em;
  }
}

@keyframes dialog-show {
  from {
    opacity: 0;
    translate: 0 -1em;
  }

  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes backdrop-show {
  from {
    opacity: 0;
    backdrop-filter: blur(0);
  }

  to {
    opacity: 1;
    backdrop-filter: blur(0.25em);
  }
}

@keyframes backdrop-hide {
  from {
    opacity: 1;
    backdrop-filter: blur(0.25em);
  }

  to {
    opacity: 0;
    backdrop-filter: blur(0);
  }
}
</style>
