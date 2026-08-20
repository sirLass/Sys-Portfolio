<template>
  <div class="landing-page">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectSection />
    <ExperienceSection />
    <GallerySection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue'
import HeroSection from '../components/hero_section.vue'
import AboutSection from '../components/about_section.vue'
import SkillsSection from '../components/skills_section.vue'
import ProjectSection from '../components/projects_section.vue'
import ExperienceSection from '../components/experience_section.vue'
import GallerySection from '../components/gallery_section.vue'
import ContactSection from '../components/contact_section.vue'
import Footer from '../components/footer_section.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectSection,
    ExperienceSection,
    GallerySection,
    ContactSection,
    Footer
  }
}
</script>
