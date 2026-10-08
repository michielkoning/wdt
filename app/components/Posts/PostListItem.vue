<script lang="ts" setup>
import {
  ClickableWrapper,
} from '@m11g/library'

defineProps<PostListItem>()
</script>

<template>
  <clickable-wrapper
    :to="$localePath({
      name: 'post',
      params: {
        slug: slug,
      },
    })"
  >
    <div class="wrapper">
      <div class="image-wrapper">
        <app-image
          v-if="image"
          :image="image"
          class="image featured-image"
        />
      </div>
      <div class="content">
        <h3>
          <nuxt-link-locale
            class="link"
            :to="{
              name: 'post',
              params: {
                slug: slug,
              },
            }"
          >
            {{ title }}
          </nuxt-link-locale>
        </h3>a
        <nuxt-time
          class="date"
          :datetime="new Date(date)"
          year="numeric"
          month="long"
          day="numeric"
        />
        <div
          class="text"
          v-html="excerpt"
        />
      </div>
      <div class="read-more-wrapper">
        <read-more class="read-more" />
      </div>
    </div>
  </clickable-wrapper>
</template>

<style lang="css" scoped>
.link {
  color: currentcolor;
  text-decoration: none;
}

time {
  font-size: var(--font-size-sm);
}

:deep(p) {
  margin-block-end: var(--spacing-2);
}

li {
  position: relative;
  display: grid;
  padding-block-end: var(--spacing-4);
  container-name: achive-list;
  container-type: inline-size;

  &:hover,
  &:focus-within {
    a {
      text-decoration: underline;
    }
  }
}

.image-wrapper {
  flex: 0 0 auto;
  aspect-ratio: 16 / 9;

  @container achive-list (width > 32em) {
    aspect-ratio: auto;
  }
}

.image,
.image:deep(img) {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;

  @container achive-list (width > 32em) {
    block-size: auto;
  }
}

.read-more-wrapper {
  padding-inline: var(--spacing-4);
  margin-block-start: auto;

  @container achive-list (width > 32em) {
    grid-column: 2 / 3;
    padding-inline: 0;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: start;
  block-size: 100%;
  padding-block-end: var(--spacing-4);
  color: var(--color-black);
  background-color: var(--color-white);

  @container achive-list (width > 32em) {
    display: grid;
    grid-template-columns: 14em auto;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }
}

.content {
  padding: var(--spacing-4) var(--spacing-4) var(--spacing-2);

  @container achive-list (width > 32em) {
    padding: 0;
  }
}

.text:deep(p) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  line-clamp: 5;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
